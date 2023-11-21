import axios from 'axios';
import * as cheerio from 'cheerio';

/************************
 *
 * SERVICE (link to APIs)
 * 
 ***********************/

export async function searchGoogleScholar(data) {
  console.log(`/api/google/query/${data}`);
  const response = await fetch (`/api/google/query/${data}`, {method: 'GET'})

  return response.json();
}

export async function citeGoogleScholar(data) {
  console.log(`/api/google/cite/${data}`);
  const response = await fetch (`/api/google/cite/${data}`, {method: 'GET'});

  return response.json();
}

export async function getHTMLContent(data) {
  console.log(`/api/htmlcontent/${data}`);
  const response = await fetch (`/api/htmlcontent/${encodeURIComponent(data)}`, {
    method: 'GET',
    headers: new Headers({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    })
  });
  return await response.text();
}

// This function changes as OpenAI update the API, be aware if calls are failing this is likely the culprit.
// So far changes I've had to make include: model going obsolete, messages requiring different formatting.
export async function postOpenAIAPI(messagesParam) {
  console.log(`Querying OpenAI API`);
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      messages: messagesParam,
      model: "gpt-4-1106-preview",
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`, // Authorisation will be usable until end of 2023.
      },
    }
  );
  return response.data.choices[0].message.content.trim();
}

/************************
 *
 * HELPERS
 * 
 ***********************/

// This consolidates all the main functionality to return a verified response from GPT-4
export async function evaluateInputAndResponse (input, messagesParam) {
  console.log("INPUT HERE:", input);
  const keywords = await identifyKeywords(input);
  console.log("KEYWORDS", keywords);
  let sources = await searchGoogleScholarAPI(keywords);
  sources = await filterSources(sources);
  let sourceObjects = [];
  let inputResponse = "";

  /*
  source = {
    reference: AUTHOR, YEAR, TITLE, PUBLISHER
    text: extracted relevant text
    notes: from chatgpt analysis of the text
  }
  */
 
  sourceObjects = await extractFromSources(sources);
  console.log(sourceObjects);
  sourceObjects = await parseGoogleScholarSources(sourceObjects);
  inputResponse = await answerInputWithReferences(input, messagesParam, sourceObjects);
  console.log("INPUT RESPONSE RETURNED", inputResponse);
  return inputResponse;

}

// returns a string to query google scholar/google
async function identifyKeywords (input) {
  const keywordString = "Can you please determine a good, simple and relevant, Google Scholar query that doesn't use quotations or special characters, based on the following user input. "
  + "Do not provide any further text - only a relevant query. Consider the nature of this conversation as an educational tool and the Input: " + input;
  const messagesParam = [{"role": "system", "content": keywordString}];
  const keywordResponse = await postOpenAIAPI(messagesParam);
  return keywordResponse;
}

// returns a list of sources on Google Scholar found by SerpAPI
// further improvements could include conducting a standard Google search as well (or, dependent on the context)
async function searchGoogleScholarAPI (keywords) {
  const sources = await searchGoogleScholar(keywords);
  return sources;
}

// filters the sources array to ensure they are not pdfs
async function filterSources (sources) {
  const filteredSources = sources.filter(source => {
    if (source.hasOwnProperty('link')) {
        const isPDF = source.link.includes('.pdf');
        const isGoogleBooks = source.link.includes('books.google.com');
        const isSagePub = source.link.includes('sagepub');
        const isTandf = source.link.includes('tandfonline');
        const isArxis = source.link.includes('arxiv.org');
        const isSciendo = source.link.includes('sciendo.com');
        const isEBSCO = source.link.includes('ebscohost');
        const isHeinOnline = source.link.includes('heinonline');
        const isUChic = source.link.includes('uchicago');
        const isPhilArchive = source.link.includes('philarchive');
        const isJSTOR = source.link.includes('jstor');
        const isPsycNet = source.link.includes('psycnet');
        const isNCBI = source.link.includes('ncbi');
        const isProquest = source.link.includes('proquest');
        
        return !isPDF && !isGoogleBooks && !isSagePub && !isTandf && !isArxis && !isSciendo && !isEBSCO && !isHeinOnline && !isUChic && !isPhilArchive && !isJSTOR && !isPsycNet && !isNCBI && !isProquest; 
    }
    return true;
});
return filteredSources;
}

// function to get the relevant information from each source (citation, html)
async function extractFromSources (sources) {
  console.log(sources);
  let nSourcesToExtract = 2;
  if (sources.length < 2) {
    nSourcesToExtract = sources.length;
  };
  let extractedSources = [];
  let reference = '';
  let text = '';

  for (let i = 0; i < nSourcesToExtract; i++) {
    reference = await extractReference(sources[i]);
    text = await extractText(sources[i]);

    extractedSources[i] = {
      source: reference,
      text: text,
      link: sources[i].link,
    }
  }

  console.log(extractedSources);
  return extractedSources;

}

// extracts the reference from a source
async function extractReference (source) {
  console.log(source);
  let sourceId = source.result_id;
  const citations = await citeGoogleScholar(sourceId);
  return citations.citations[0].snippet;
}

// extract html from a source
async function extractText (source) {
  // extract the text from a source
  const link = source.link;
  let content = "";
  let mainText = "";
  const isPDF = /.+\.pdf$/i.test(link);

  if (isPDF) {
    console.log("Cannot extract text from PDF...", link);
  } else {
    console.log("Extracting text from HTML...");
    content = await getHTMLContent(link);
    const $ = cheerio.load(content);
    
    // can update this to include more options as we find more variations - not ideal, but does the job :/
    let abstractSection = $('p, abstract, article, .article, #article, #description, .description, .abstracts, #abstracts, Abstract, .articleBody, #articleBody, .article-body, #article-body, .bodymatter, #bodymatter, .container, #article-body, .article-body, #container, .abstract, #abstract, .abstractSection, #abstractSection, .abstract-group, #abstract-group, #record, .record');

    console.log('ABSTRACT SECTION', abstractSection.text());
    if (abstractSection.length) {
      mainText = abstractSection.text();
    } else {
      //mainText = $('body').text();
      mainText = $.text();
    }

    mainText = mainText.replace(/\n|\t|\r/g, '');
    mainText = mainText.replace(/\\n/g, '');
  }
  
  return mainText;
}

// parse all the sources, returns an array where each index contains an object
// {
//   source: the reference
//   notes: summarised notes
//   text: the extracted html
//   link: the link
// }
async function parseGoogleScholarSources (sources) {
  // big chunk of work here
  // for each result:
  // Summarise:
    // find length of text
    // divide by n characters (whatever is sendable to openAI API)
    // break text into parsable chunks accordingly
    // For each chunk:
      // send to openAI API and ask to provide detailed notes and extract relevant quotes.
      // store the response in an array of length n (n chunks)
    // concatenate responses
    // send total response and ask openAI API to consolidate the notes
    // store the result in array for n texts
  // Generate reference
    // extract the needed properties and construct reference for each source

    console.log(sources);
    let i = 0;
    let notes = "";
    let nSources = 2;
    if (sources.length < 2) {
      nSources = sources.length;
    }
    for(i = 0; i < nSources; i++) {
      let sourcePieces = await splitStringIntoChunks(sources[i].text, 4000);
      console.log("SOURCE PIECES", sourcePieces);
      notes = await retrieveNotesFromOpenAI(sourcePieces);
      sources[i].notes = notes;
    }

    return sources;
}

async function retrieveNotesFromOpenAI(sourcePieces) {
    // For each chunk:
      // send to openAI API and ask to provide detailed notes and extract relevant quotes.
      // store the response in an array of length n (n chunks)
    // concatenate responses
    let nPieces = sourcePieces.length;
    if (nPieces > 5) {
      nPieces = 5;
    };
    const adminMessage = "Hi GPT, I am going to provide you with a series of messages that are each parts of a whole HTML element. "
    + "Can you please extract and summarise the key points made by the article within the HTML. Provide detailed notes and extract any useful quotes from the text as well. "
    + "These notes will be used to answer a question later. Thank you!";
    let i = 0;
    let aiResponses = [];
    let message = [];
    message[0] = {"role": "system", "content": adminMessage};
    for (i = 0; i < nPieces; i++) {
      try {
        message[1] = {"role": "system", "content": sourcePieces[i]};
        aiResponses[i] = await postOpenAIAPI(message);
      } catch (e) {
        console.log("Error quering OpenAI API::", e);
      }
    }

    console.log(aiResponses);
    const notes = await consolidateAINotes(aiResponses);
    
    return notes;
}

// Consolidates the sets of notes for a source
async function consolidateAINotes(aiResponses) {
  const consolidationPrompt = "The following are notes collected from various documents. Please consolidate them into a coherent summary of the key points "
  + "presented by the text including relevant quotes from the text and using in-text citations to acknowledge which source you have based your statements on throughout: ";

  let extractedText = aiResponses.map(response => {
    return response;
  }).join("\n");

  const finalPrompt = `${consolidationPrompt}\n${extractedText}`;
  const message = [{"role": "system", "content": finalPrompt}];

  const consolidatedResponse = await postOpenAIAPI(message);
  console.log("CONSOLIDATED SOURCE NOTES", consolidatedResponse);

  return consolidatedResponse;
}

// Splits strings into chunks that can be parsed
async function splitStringIntoChunks(str, chunkSize) {
  var chunks = [];

  for (var i = 0, charsLength = str.length; i < charsLength; i += chunkSize) {
    chunks.push(str.substring(i, i + chunkSize));
  }

  return chunks;
}

// send the notes and original user input to the api and obtain an answer
async function answerInputWithReferences (input, messagesParam, sources) {
  let formattedSources = "";
  let i = 0;
  for (i = 0; i < sources.length; i++) {
    formattedSources += "Source " + sources[i].source + " notes: " + sources[i].notes + ".";
  }

  console.log(sources);

  let prompt = "Given the conversation provided, the user input -and the information provided in the following sources and notes on the texts, "
  + "please generate your response providing in-text references to ensure credibility. BUT if the notes do not provide relevant information, "
  + "do not reference them if you are not actually using the information from them. Additionally, if appropriate, use markdown to format your response";
  prompt += formattedSources;
  prompt += "The user input to respond to is: " + input;

  messagesParam.push({"role": "system", "content": prompt});
  
  const response = await postOpenAIAPI(messagesParam);
  return response + "\n\n**Sources recommended for further reading:**  \n1. [" + sources[0].source + "](" + sources[0].link + ")  \n2. [" + sources[1].source + "](" + sources[1].link + ")";
}
