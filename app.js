const babel = require('@babel/core');
const parser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

















function extractAxiosEndpointsAndStateInUseEffect  (functionString) {
    const axiosEndpointsAndStateInUseEffect = [];
  console.log(functionString)
    const ast = parser.parse(functionString, {
      sourceType: 'module',
      plugins: ['jsx'],
    });
  
    let stateVarName = null;
  
    const stateVariables = new Map();
   
traverse(ast, {
  VariableDeclarator(path) {
    // Assuming 'patients' is the state variable targeted by Axios
 
    // Assuming you want to track all useState declarations
    if (path.node.init && path.node.init.type === 'CallExpression' && path.node.init.callee.name === 'useState') {
      const useStateVarName = path.node.id.elements[1].name;
      const useStateVarValue = path.node.id.elements[0].name;
      stateVariables.set(useStateVarName, useStateVarValue);
    }
}})
traverse(ast, {
    CallExpression(path) {
      const isUseEffect =
        path.node.callee &&
        path.node.callee.name === 'useEffect' &&
        path.parent.type === 'ExpressionStatement';

      if (isUseEffect) {
      
        path.traverse({

            ExpressionStatement(pp){
                
if(stateVariables.has(pp.node.expression.callee.name)){
const functionName=stateVariables.get(pp.node.expression.callee.name)
pp.traverse(   {  AwaitExpression(innerPath){
          
    const callExpression = innerPath.node;
  
    const isAxiosGet =
      callExpression &&
      callExpression.type === 'AwaitExpression' &&
      callExpression.argument &&
      callExpression.argument.callee &&
      callExpression.argument.callee.object &&
      callExpression.argument.callee.object.name === 'axios' 
    if (isAxiosGet) {
 // Extracting the function name
        const endpoint = callExpression.argument.arguments[0].value;
        axiosEndpointsAndStateInUseEffect.push({
          method: callExpression.argument.callee.property.name.toUpperCase(),
          endpoint: endpoint,
          statevar: functionName, // Store the function name in the result object
       







       })
  }
}})







     }}})
    }}})




return axiosEndpointsAndStateInUseEffect



}

  



async function convertJsxToHtml  (jsxContent)  {
 

  // Transform JSX code to JavaScript using Babel
  const { code } = await babel.transformAsync(jsxContent, {
    presets: ['@babel/preset-react', '@babel/preset-env'],
  });

  // For demonstration, returning the code as HTML directly
  return `<pre>${code}</pre>`;
};



module.exports={extractAxiosEndpointsAndStateInUseEffect,convertJsxToHtml}



















