export default interface WikiResponse{
    api_urls: string[]
    content_urls: {desktop: string[], mobile: string[]}
    coordinates?: {lat: number, lon: number}
    description: string
    description_source: string
    dir: string
    displayTitle: string
    extract: string
    extract_html: string
    lang?: string
    namepace: {id: number, text: string}
    originalimage?: {height: number, source: string, width: number}
    pageid: number
    revision: string
    thumbnail: {height: number, source: string, width: number}
    tid: string
    timestamp: string
    title: string
    titles: {canonical: string, display: string, normalized: string}
    type: string
    wikibase_item: string
}