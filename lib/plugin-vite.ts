import type { Plugin } from 'vite'

interface VueDaisyUIOptions {
  showOutput?: boolean;
  failOnError?: boolean;
}

/**
 * Vite plugin to ignore tailwind class of unused components before build.
 */
export default function vueDaisyUI(options: VueDaisyUIOptions = {}): Plugin {
  const {
    showOutput = true,
    failOnError = false
  } = options
  
  return {
    name: 'vue-daisyui-component-detector',
    apply: 'build',
    
    buildStart: async () => {
      try {
        // Importations dynamiques pour éviter les problèmes côté client
        const { spawn } = await import('child_process')
        const { resolve } = await import('path')
        const { existsSync } = await import('fs')
        
        const scriptPath = resolve('./lib/build-scripts/detect-unused-components.js')
        
        if (!existsSync(scriptPath)) {
          console.error('Component detection script not found:', scriptPath)
          return
        }
        
        if (showOutput) {
          console.log('/*! 🌳 daisyUI vue kit */');
        }
        
        return new Promise<void>((resolve, reject) => {
          const stdioOption = showOutput ? 'inherit' : 'ignore'
          
          // Définir les variables d'environnement à passer au script
          const env = {
            ...process.env,
            DAISYUI_SHOW_OUTPUT: showOutput ? 'true' : 'false',
            DAISYUI_FAIL_ON_ERROR: failOnError ? 'true' : 'false'
          }
          
          // Passer l'environnement modifié au processus enfant
          const childProcess = spawn('node', [scriptPath], { 
            stdio: stdioOption,
            env: env
          })
          
          childProcess.on('close', (code) => {
            if (code === 0) {
              resolve()
            } else {
              if (showOutput) {
                console.error(`❌ Component detection failed with code ${code}`)
              }
              if (failOnError) {
                reject(new Error('Component detection failed'))
              } else {
                resolve()
              }
            }
          })
          
          childProcess.on('error', (err) => {
            if (showOutput) {
              console.error('Failed to execute component detection script:', err)
            }
            if (failOnError) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
      } catch (error) {
        console.error('Error in vueDaisyUI plugin:', error)
        if (failOnError) {
          throw error
        }
      }
    }
  }
}