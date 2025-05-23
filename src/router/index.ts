import { createRouter, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob([
  '../../src/**/views/*/index.tsx',
  '../../src/**/views/*/index.vue',
])

const flatRoutes = await Object.keys(modules).reduce(async (acc: any, cur) => {
  const configPath = cur.replace(/index\.(tsx|vue)/, 'config.ts')

  let config = {}
  try {
    const m = await import(configPath /* @vite-ignore */)
    config = m.default || m
  } catch (error) {}

  let reg = /views\/(.*?)\//g
  let list = [...cur.matchAll(reg)]
  const deep = list.length
  const reversedList = JSON.parse(JSON.stringify(list)).reverse()
  const name = reversedList[0][1]
  const parent = deep > 1 ? reversedList[1][1] : ''
  const fullPath = list.map((item) => item[1]).join('/')
  const _acc = await acc
  _acc.push({
    name,
    path: `/${fullPath}`,

    parent: parent,
    component: () => import(cur /* @vite-ignore */),
    meta: config,
  })
  return Promise.resolve(_acc)
}, [])

function list2tree(arr: any[], parent = '') {
  return arr
    .filter((i) => i.parent === parent)
    .map((i) => {
      i.children = list2tree(arr, i.name)
      return i
    })
}

const generateRoutes = (): any[] => {
  return list2tree(flatRoutes)
}

export const routes: any[] = generateRoutes()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
