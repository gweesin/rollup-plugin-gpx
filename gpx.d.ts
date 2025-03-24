import type { FeatureCollection } from 'geojson'

declare module '*.gpx' {
  const content: FeatureCollection
  export default content
}
