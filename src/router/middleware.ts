export default function auth ({ next, store }: any){
  if(!store.getters.getLogin){
    return next({
      name: 'login'
    })
  }
  return next()
  }