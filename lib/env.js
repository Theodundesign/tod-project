export function validateEnv(required = []){
  const missing = required.filter(k=>!process.env[k])
  if(missing.length){
    throw new Error('Missing environment variables: ' + missing.join(', '))
  }
  return true
}
