

export let setCtx = ( ctx ) => {
    ctx.set( Object.assign({
        'Content-Type': 'application/json'
    }, process.env.NODE_ENV === 'development' ? { 'Access-Control-Allow-Origin': '*' } : { }))
}