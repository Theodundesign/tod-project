export function log(...args){
  if(process.env.NODE_ENV === 'production'){
    // placeholder: integrate with Sentry/Datadog here
    console.log('[APP]',...args)
  }else{
    console.log('[DEV]',...args)
  }
}

export function error(...args){
  if(process.env.NODE_ENV === 'production'){
    console.error('[APP ERROR]',...args)
  }else{
    console.error('[DEV ERROR]',...args)
  }
}
