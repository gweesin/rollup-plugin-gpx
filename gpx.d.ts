declare module '*.gpx' {
  import type { GeoJsonFeatureCollection } from './index'

  const content: GeoJsonFeatureCollection
  export default content

  export const rawGpx: string
}
