export interface RawDisplayListData {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: DisplayListData[],
  support: Support
}

export interface DisplayListData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
  is_favorite: boolean,
  totalItems?: number
}

export interface SingleUserData {
  data: DisplayListData,
  support: Support
}

interface Support {
  url: string,
  text: string
}