<template>
  <div class="materials">
    <div class="materials__topbar">
      <div class="materials__sort">
        <div ref="sortDropdown" class="materials__dropdown" @keydown.escape="openSort=false">
          <button class="materials__btn-sort" @click="openSort=!openSort" :aria-expanded="openSort">
            <span class="materials__btn-sort-text">{{ sortLabel }}</span>
            <svg viewBox="0 0 24 24" class="materials__icon"><path d="M7 10l5 5 5-5"/></svg>
          </button>
          <div v-if="openSort" class="materials__menu">
            <button class="materials__menu-item" :class="{'materials__menu-item--active': sort==='desc'}" @click="setSort('desc')">{{ $t('materials.sort.new') }}</button>
            <button class="materials__menu-item" :class="{'materials__menu-item--active': sort==='asc'}"  @click="setSort('asc')">{{ $t('materials.sort.old') }}</button>
          </div>
        </div>
        <button class="materials__btn-refresh" :title="$t('materials.refresh_title')" @click="refresh">
          <svg viewBox="0 0 24 24" class="materials__icon">
            <path d="M4 12a8 8 0 018-8 8 8 0 017.45 5h-2.2A6 6 0 006 12a6 6 0 0010.24 4.24l1.42 1.42A8 8 0 014 12z"/>
            <path d="M20 4v6h-6"/>
          </svg>
        </button>
      </div>

      <div class="materials__filters">
        <div ref="dirDropdown" class="materials__dropdown" @keydown.escape="openDir=false">
          <button class="materials__btn-select" @click="openDir=!openDir" :aria-expanded="openDir">
            <span class="materials__btn-select-text">{{ directionLabel }}</span>
            <svg viewBox="0 0 24 24" class="materials__icon"><path d="M7 10l5 5 5-5"/></svg>
          </button>
          <div v-if="openDir" class="materials__menu">
            <button class="materials__menu-item" :class="{'materials__menu-item--active': !direction}" @click="setDirection(null)">{{ $t('homework.directions.all') }}</button>
            <button v-for="d in directions" :key="d" class="materials__menu-item" :class="{'materials__menu-item--active': direction===d}" @click="setDirection(d)">
              {{ d }}
            </button>
          </div>
        </div>

        <div class="materials__chips">
          <button v-for="t in selectedTags" :key="t" class="materials__chip" @click="toggleTag(t)">
            <span class="materials__chip-dot"></span>
            <span class="materials__chip-text">{{ t }}</span>
            <svg viewBox="0 0 24 24" class="materials__icon materials__icon--close"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>

          <div ref="tagsDropdown" class="materials__dropdown" @keydown.escape="openTags=false">
            <button class="materials__chip materials__chip--add" @click="openTags=!openTags">{{ $t('materials.add_tag') }}</button>
            <div v-if="openTags" class="materials__menu materials__menu--tags">
              <button v-for="t in allTags" :key="t" class="materials__menu-item"
                      :class="{'materials__menu-item--active': selectedTags.includes(t)}"
                      @click="toggleTag(t)">
                {{ t }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="materials__lists">
      <ul class="materials__col">
        <li v-for="n in 5" :key="'s1'+n" class="materials__row">
          <div class="materials__cell materials__cell--title">
            <span class="materials__skeleton-ico"></span>
            <span class="materials__skeleton-text"></span>
          </div>
          <span class="materials__skeleton-ico-btn"></span>
        </li>
      </ul>
      <ul class="materials__col">
        <li v-for="n in 5" :key="'s2'+n" class="materials__row">
          <div class="materials__cell materials__cell--title">
            <span class="materials__skeleton-ico"></span>
            <span class="materials__skeleton-text"></span>
          </div>
          <span class="materials__skeleton-ico-btn"></span>
        </li>
      </ul>
    </div>

    <div v-else class="materials__lists">
      <ul class="materials__col">
        <li v-for="it in leftColumn" :key="it.id" class="materials__row">
          <div class="materials__cell materials__cell--title" @click="openItem(it)" role="button">
            <span class="materials__file-ico" :style="{ background: it.color.bg, color: it.color.fg }">
              <svg viewBox="0 0 24 24" class="materials__file-ico-svg"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </span>
            <span class="materials__title-text">{{ it.title }}</span>
          </div>
          <button class="materials__cell materials__cell--action" :style="{ color: it.color.fg }" :title="$t('materials.download_title')" @click="download(it)">
            <svg viewBox="0 0 24 24" class="materials__icon"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
          </button>
        </li>
      </ul>

      <ul class="materials__col">
        <li v-for="it in rightColumn" :key="it.id" class="materials__row">
          <div class="materials__cell materials__cell--title" @click="openItem(it)" role="button">
            <span class="materials__file-ico" :style="{ background: it.color.bg, color: it.color.fg }">
              <svg viewBox="0 0 24 24" class="materials__file-ico-svg"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
            </span>
            <span class="materials__title-text">{{ it.title }}</span>
          </div>
          <button class="materials__cell materials__cell--action" :style="{ color: it.color.fg }" :title="$t('materials.download_title')" @click="download(it)">
            <svg viewBox="0 0 24 24" class="materials__icon"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 21h14"/></svg>
          </button>
        </li>
      </ul>
    </div>

    <div class="materials__pagination">
      <button class="materials__nav materials__nav--prev" :disabled="page===1" @click="page--" :title="$t('login.recovery.back')">
        <svg viewBox="0 0 24 24" class="materials__icon"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div class="materials__pages">
        <button v-for="p in pageList" :key="p.key"
                class="materials__page"
                :class="{ 'materials__page--active': p.num===page, 'materials__page--dots': p.dots }"
                :disabled="p.dots || p.num===page"
                @click="!p.dots && (page=p.num!)">
          {{ p.label }}
        </button>
      </div>

      <button class="materials__nav materials__nav--next" :disabled="page===totalPages" @click="page++" :title="$t('materials.pagination.next_title')">
        <svg viewBox="0 0 24 24" class="materials__icon"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Template refs for dropdowns
const sortDropdown = ref<HTMLElement | null>(null)
const dirDropdown = ref<HTMLElement | null>(null)
const tagsDropdown = ref<HTMLElement | null>(null)

type Color = { bg: string; fg: string }
type Item = { id: string; title: string; createdAt: string; direction: string; tags: string[]; url: string; color: Color }

const palette: Color[] = [
  { bg: '#E8F3FF', fg: '#3B82F6' },
  { bg: '#F3E8FF', fg: '#8B5CF6' },
  { bg: '#FEF3C7', fg: '#F59E0B' },
  { bg: '#ECFDF5', fg: '#10B981' },
  { bg: '#E5F2FF', fg: '#60A5FA' },
  { bg: '#FFE8EE', fg: '#F472B6' },
  { bg: '#EEF2FF', fg: '#6366F1' },
]

const directions = computed(() => [
  t('homework.directions.mathematics'),
  t('materials.directions.reading'),
  t('materials.directions.english'),
  t('materials.directions.logic'),
])
const allTags = computed(() => ['щц', 'ма', 'A1', 'B2', t('materials.tags.homework'), t('materials.tags.test')])

const items = ref<Item[]>([])
const loading = ref(false)

const sort = ref<'asc' | 'desc'>('desc')
const openSort = ref(false)
const sortLabel = computed(() => (sort.value === 'desc' ? t('materials.sort.new') : t('materials.sort.old')))
const setSort = (s: 'asc' | 'desc') => { sort.value = s; openSort.value = false; page.value = 1 }

const direction = ref<string | null>(null)
const openDir = ref(false)
const directionLabel = computed(() => direction.value ?? t('homework.table.direction'))
const setDirection = (d: string | null) => { direction.value = d; openDir.value = false; page.value = 1 }

const selectedTags = ref<string[]>([])
const openTags = ref(false)
const toggleTag = (t: string) => {
  const set = new Set(selectedTags.value)
  set.has(t) ? set.delete(t) : set.add(t)
  selectedTags.value = Array.from(set)
  page.value = 1
}

const page = ref(1)
const pageSize = 10
const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const pageList = computed(() => {
  const tp = totalPages.value
  const p = page.value
  const arr: {key: string; num?: number; label: string; dots?: boolean}[] = []
  const push = (n:number) => arr.push({ key: `n${n}`, num:n, label:String(n) })
  if (tp <= 7) {
    for (let i=1;i<=tp;i++) push(i)
  } else {
    push(1); push(2)
    if (p > 4) arr.push({ key: 'd1', label: '…', dots: true })
    const start = Math.max(3, p-1)
    const end = Math.min(tp-2, p+1)
    for (let i=start;i<=end;i++) push(i)
    if (p < tp-3) arr.push({ key: 'd2', label: '…', dots: true })
    push(tp-1); push(tp)
  }
  return arr
})

const filtered = computed(() => {
  let list = items.value.slice()
  if (direction.value) list = list.filter(i => i.direction === direction.value)
  if (selectedTags.value.length) list = list.filter(i => selectedTags.value.every(t => i.tags.includes(t)))
  list.sort((a,b) => sort.value === 'desc'
      ? +new Date(b.createdAt) - +new Date(a.createdAt)
      : +new Date(a.createdAt) - +new Date(b.createdAt))
  return list
})

const paged = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

const leftColumn = computed(() => paged.value.filter((_, i) => i % 2 === 0))
const rightColumn = computed(() => paged.value.filter((_, i) => i % 2 === 1))

const refresh = async () => {
  await fetchItems(true)
  page.value = 1
}

const openItem = (it: Item) => {
  window.open(it.url, '_blank')
}

const download = (it: Item) => {
  const a = document.createElement('a')
  a.href = it.url
  a.download = it.title.replace(/\s+/g,'_') + '.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

function randomDate(daysBack=90) {
  const now = Date.now()
  const delta = Math.floor(Math.random()*daysBack*24*3600*1000)
  return new Date(now - delta).toISOString()
}
function pick<T>(arr:T[]) { return arr[Math.floor(Math.random()*arr.length)] }
function color(i:number){ return palette[i % palette.length] }

async function fetchItems(force = false){
  loading.value = true
  await new Promise(r => setTimeout(r, 650))
  const count = 9322 + (force ? Math.floor(Math.random()*6-3) : 0)
  items.value = Array.from({length: count}).map((_,i) => {
    const dir = pick(directions.value)
    const tgs = [pick(allTags.value)]
    if (Math.random() > .5) tgs.push(pick(allTags.value))
    return {
      id: `m_${i}_${Math.random().toString(36).slice(2,7)}`,
      title: t('materials.mock_item_title'),
      createdAt: randomDate(),
      direction: dir,
      tags: Array.from(new Set(tgs)),
      url: `https://example.com/materials/file_${i}.pdf`,
      color: color(i),
    } as Item
  })
  loading.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (sortDropdown.value && !sortDropdown.value.contains(event.target as Node)) {
    openSort.value = false
  }
  if (dirDropdown.value && !dirDropdown.value.contains(event.target as Node)) {
    openDir.value = false
  }
  if (tagsDropdown.value && !tagsDropdown.value.contains(event.target as Node)) {
    openTags.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  fetchItems()
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped lang="scss">
$bg: #f5f8ff;
$card: #ffffff;
$text: #1f2937;
$muted: #6b7280;
$border: #e5e7eb;
$primary: #3b82f6;

@keyframes materials-skeleton-shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.materials {
  min-height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: $text;

  &__topbar{
    background: $card;
    border-radius: 16px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__sort{ display:flex; align-items:center; gap:10px; }

  &__btn-sort{
    display: inline-flex; align-items: center; gap: 6px;
    background: #f8fafc; border: 1px solid $border;
    padding: 8px 12px; border-radius: 10px; font-size: 14px;
    &-text{ line-height: 1; }
  }

  &__btn-refresh{
    display: grid; place-items: center;
    width: 32px; height: 32px; border-radius: 8px;
    background: #f8fafc; border: 1px solid $border;
  }

  &__filters{ display:flex; align-items:center; gap:10px; }

  &__btn-select{
    display: inline-flex; align-items: center; gap: 6px;
    background: #f8fafc; border: 1px solid $border;
    padding: 8px 12px; border-radius: 10px; font-size: 14px;
    &-text{ line-height: 1; }
  }

  &__dropdown{ position: relative; }

  &__menu{
    position: absolute; top: 110%; left: 0; z-index: 10;
    background: #fff; border: 1px solid $border; border-radius: 12px;
    padding: 6px; min-width: 180px; box-shadow: 0 10px 30px rgba(0,0,0,.08);
    &--tags{ min-width: 220px; }
  }

  &__menu-item{
    display:block; width:100%; text-align:left;
    padding: 8px 10px; border-radius: 8px; font-size: 14px;
    &:hover{ background: #f1f5f9; }
    &--active{ color:#1d4ed8; background:#eff6ff; }
  }

  &__chips{ display:flex; gap:8px; flex-wrap:wrap; align-items:center; }

  &__chip{
    display:inline-flex; align-items:center; gap:6px;
    background:#f1f5f9; border:1px solid $border;
    padding:6px 10px; border-radius:999px; font-size:13px; cursor:pointer;
    &--add{ background:#eef2ff; border-color:#e0e7ff; }
    &-dot{
      width:8px; height:8px; border-radius:50%; background:$primary;
      box-shadow: 0 0 0 3px rgba(59,130,246,.15);
    }
    &-text{ line-height: 1; }
  }

  &__icon{
    width:18px; height:18px; fill:none; stroke: currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round;
    &--close{ stroke:#94a3b8; }
  }

  &__lists{
    background: $card;
    border-radius: 16px;
    padding: 8px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  &__col{ list-style:none; margin:0; padding:0; }

  &__row{
    display:flex; justify-content:space-between; align-items:center;
    padding:14px 12px; gap:8px;
    border-bottom:1px solid $border;
    &:last-child{ border-bottom: none; }
  }

  &__cell{
    &--title{ display:flex; align-items:center; gap:12px; min-width:0; cursor:pointer; }
    &--action{
      background:transparent; border:none; padding:6px; border-radius:8px;
      display:grid; place-items:center; cursor:pointer;
      &:hover{ background:#f1f5f9; }
    }
  }

  &__title-text{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-size:14px; }

  &__file-ico{
    width:32px; height:32px; border-radius:10px;
    display:grid; place-items:center; flex:0 0 32px;
    &-svg{ width:18px; height:18px; fill: currentColor; stroke: none; }
  }

  &__pagination{
    display:flex; align-items:center; justify-content:center;
    gap:12px; padding:8px 0;
  }

  &__pages{ display:flex; gap:6px; }

  &__page{
    min-width:32px; height:32px; padding:0 8px;
    border-radius:8px; border:1px solid $border;
    background:#fff; font-size:13px; cursor:pointer;
    &--active{ border-color:#bfdbfe; color:#1d4ed8; box-shadow:0 0 0 3px rgba(59,130,246,.12); }
    &--dots{ background:transparent; border:none; color:$muted; cursor:default; }
  }

  &__nav{
    width:32px; height:32px; border-radius:8px; border:1px solid $border;
    background:#fff; display:grid; place-items:center;
    &:disabled{ opacity:.5; cursor:not-allowed; }
  }

  &__skeleton-ico,
  &__skeleton-ico-btn,
  &__skeleton-text{
    background: linear-gradient(90deg, #f2f4f7 25%, #e9edf3 50%, #f2f4f7 75%);
    background-size: 200% 100%;
    animation: materials-skeleton-shimmer 1.2s infinite linear;
    display: block;
    border-radius: 8px;
  }

  &__skeleton-ico{ width:32px; height:32px; flex:0 0 32px; }
  &__skeleton-ico-btn{ width:18px; height:18px; flex:0 0 18px; border-radius:6px; }
  &__skeleton-text{ height:14px; width:70%; border-radius:6px; }

  @media (max-width: 900px){
    &__lists{ grid-template-columns: 1fr; }
  }
}
</style>