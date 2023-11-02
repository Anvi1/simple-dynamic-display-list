export interface RawDisplayListData {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: DisplayListData[],
  support:{
    url: string,
    text: string
  }
}

export interface DisplayListData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}