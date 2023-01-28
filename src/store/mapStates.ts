import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store/store'

const mapState = () => {
  const store = useStore(key)
  return Object.fromEntries(
    Object.keys(store.state).map(
      key => [key, computed(() => store.state[key as keyof typeof store.state])]
    )
  )
}

const mapGetters = () => {
  const store = useStore(key)
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => [getter, computed(() => store.getters[getter])]
    )
  )
}
const mapMutations = () => {
  const store: any = useStore(key)
  return Object.fromEntries(
    Object.keys(store._mutations).map(
      mutation => [mutation, (value: any) => store.commit(mutation, value)]
    )
  )
}

const mapActions = () => {
  const store: any = useStore(key)
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => [action, (value?: any) => store.dispatch(action, value)]
    )
  )
}
export { mapState, mapGetters, mapMutations, mapActions }