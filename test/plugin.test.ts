import { describe, expect, it } from 'vitest'
import gpxPlugin from '../src/index'

const sampleGpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Example">
  <metadata>
    <name>Test Route</name>
  </metadata>
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="47.644548" lon="-122.326897">
        <ele>4.46</ele>
        <time>2023-01-01T12:00:00Z</time>
      </trkpt>
      <trkpt lat="47.644550" lon="-122.326898">
        <ele>4.94</ele>
        <time>2023-01-01T12:01:00Z</time>
      </trkpt>
    </trkseg>
  </trk>
</gpx>`

describe('gpxPlugin', () => {
  it('transforms gpx to geojson', () => {
    const plugin = gpxPlugin()
    // @ts-expect-error - Using private property for testing
    const result = plugin.transform(sampleGpx, 'test.gpx')

    expect(result).not.toBeNull()
    if (result) {
      const { code } = result
      expect(code).toContain('export default geoJson')

      // Evaluate the code to check the structure
      const exports = {}
      const fn = new Function('exports', `${code}; return exports.default;`)
      const geoJson = fn(exports)

      expect(geoJson).toHaveProperty('type', 'FeatureCollection')
      expect(geoJson.features).toBeInstanceOf(Array)
    }
  })

  it('respects file extensions option', () => {
    const plugin = gpxPlugin({ extensions: ['.custom'] })
    // @ts-expect-error - Using private property for testing
    const gpxResult = plugin.transform(sampleGpx, 'test.gpx')
    // @ts-expect-error - Using private property for testing
    const customResult = plugin.transform(sampleGpx, 'test.custom')

    expect(gpxResult).toBeNull()
    expect(customResult).not.toBeNull()
  })

  it('includes raw gpx when configured', () => {
    const plugin = gpxPlugin({ includeRaw: true })
    // @ts-expect-error - Using private property for testing
    const result = plugin.transform(sampleGpx, 'test.gpx')

    expect(result).not.toBeNull()
    if (result) {
      const { code } = result
      expect(code).toContain('export const rawGpx')
    }
  })
})
