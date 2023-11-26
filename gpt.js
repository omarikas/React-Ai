const babel = require('@babel/core');
const { Writable } = require('stream');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const axios = require('axios');
const {extractAxiosEndpointsAndStateInUseEffect}=require('./app')

const traverse = require('@babel/traverse').default;

const generator = require('@babel/generator').default;

const parser = require('@babel/parser');




const dom=require('react-router-dom')







async function final(jsstring,transpiled){
return await parse(jsstring, transpiled, await extractawaits(extractAxiosEndpointsAndStateInUseEffect(jsstring)))

}

  async function parse(org,transpiled,resp){
const string=`${org} and api response is rep=${JSON.stringify(resp)}`


try{

  


const OpenAI=require("openai");

const openai = new OpenAI( {dangerouslyAllowBrowser: true });
async function main() {
    console.log(resp)
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content":`i have jsx function that is ${org} that renders to${transpiled}
        can you spot a mistake?  (ignore the odd imports)`}],
    model: "gpt-3.5-turbo",
  });
console.log(completion.choices[0].message.content)
  return completion.choices[0].message.content
}
return  await main()

}catch(err){


console.log(err)
  const OpenAI=require("openai");

  const openai = new OpenAI( {dangerouslyAllowBrowser: true });
  async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Who won the world series in 2020?"},
          {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
          {"role": "user", "content":`i have jsx function that is ${org} that and error${err}
          can you spot a mistake?`}],
      model: "gpt-3.5-turbo",
    });
  
    return completion.choices[0].message.content
  }
  return err+await main()




}
  }
 async function extractawaits(calls){

try{

    var res={}
if(calls[0]?.method==="GET"){



 await axios.get(calls[0].endpoint).then(rep=>{
  res[calls[0].statevar]=rep.data;
  
  })
}

return res;
}catch (err){
  return err;
}


  }

  module.exports={final}






