import { UserSchema } from "./user";
import { PhotoSchema } from "./photo";
import api from '../api'

export interface AlbumSchema {
  userId: number
  id: number
  title: string
}

export interface AlbumFilterSchema {

}

export class Album implements AlbumSchema {
  userId: number
  id: number
  title: string

  user: UserSchema | void = null
  photos: PhotoSchema[] = []

  constructor(albumData: AlbumSchema) {
    Object.assign(this, albumData)
  }

  static async find(filter: Object, includes?: string[]): Promise<Album> {
    let album: Album
    const filterProperty: string = Object.keys(filter)[0] // On ne prend que le premier filtre de l'objet passé en paramètre
    const filterValue: any = Object.values(filter)[0]
    let includesTransfer: string[] = []
    if(includes && includes.length) includesTransfer = includes
    switch (filterProperty) {
      case 'userId':
        album = await this.findByUserId(filterValue, includesTransfer)
        break
      case 'id':
        album = await this.findById(filterValue, includesTransfer) 
        break
      // case 'title':
      //   album = await this.findByTitle(filterValue, includesTransfer)
      //   break
      default:
        throw Error('Unable to filter by " ' + filterProperty + ' " value... ')
    }
    return album
  }

  static async findById(albumId: number, includes?: string[]): Promise<Album> {
    const { data } = await api.get<AlbumSchema>(`albums/${albumId}`)
    const album = new Album(data)
    if (includes && includes.length) await album.loadIncludes(includes)
    return album
  }

  static async findByUserId(userId: number, includes?: string[]): Promise<Album> {
    const { data } = await api.get<AlbumSchema>(`albums/${userId}`)
    const album = new Album(data)
    if (includes && includes.length) await album.loadIncludes(includes)
    return album
  }

  // static async findByTitle(title: number, includes?: string[]): Promise<Album> {
  //   const { data } = await api.get<AlbumSchema>(`albums/${albumId}`)
  //   const album = new Album(data)
  //   if (includes && includes.length) await album.loadIncludes(includes)
  //   return album
  // }

  async loadIncludes(includes: string[]): Promise<void> {
    await Promise.all(includes.map(async (include) => {
      switch (include) {
        case 'user':
          const { data: userData } = await api.get<UserSchema>(`users/${this.userId}`)
          this.user = userData
          break
        case 'photos':
          const { data: photoData } = await api.get<PhotoSchema[]>(`photos?albumId=${this.id}`)
          this.photos = photoData
          break
      }
    }))
  }

  toString() {
    return JSON.stringify(this)
  }
}

export default Album