import type { Plugin } from 'rollup'
import { readFileSync } from 'node:fs'
import { gpx } from '@tmcw/togeojson'
import { DOMParser } from 'xmldom'

export interface GpxPluginOptions {
  /**
   * The file extensions to be processed by this plugin
   * @default ['.gpx']
   */
  extensions?: string[]
  /**
   * Whether to include the raw GPX string in the output
   * @default false
   */
  includeRaw?: boolean
}

export default function gpxPlugin(options: GpxPluginOptions = {}): Plugin<void> {
  const extensions = options.extensions || ['.gpx']
  const includeRaw = options.includeRaw || false

  return {
    name: 'rollup-plugin-gpx',

    transform(code: string, id: string) {
      // Check if this file should be processed by this plugin
      const fileExt = id.substring(id.lastIndexOf('.'))
      if (!extensions.includes(fileExt)) {
        return null
      }

      try {
        // Read the GPX file and convert to GeoJSON
        const gpxContent = code || readFileSync(id, 'utf-8')
        const dom = new DOMParser().parseFromString(gpxContent)
        const geoJson = gpx(dom)

        // Create a module that exports the GeoJSON data
        let output = `const geoJson = ${JSON.stringify(geoJson)};\n`
        output += 'export default geoJson;\n'

        // Optionally include the raw GPX string
        if (includeRaw) {
          output += `export const rawGpx = ${JSON.stringify(gpxContent)};\n`
        }
        return {
          code: output,
          map: { mappings: '' }, // No source map needed for this transformation
        }
      }
      catch (error) {
        this.error(`Error processing GPX file ${id}: ${error}`)
        return null
      }
    },
  }
}
