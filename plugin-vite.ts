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
    },

    // Hook exécuté quand le bundle est complètement fermé (après writeBundle)
    closeBundle: async () => {
      try {
        const { resolve } = await import('path')
        const { writeFileSync, existsSync, mkdirSync } = await import('fs')
        
        // Chemin vers le fichier index.css dans lib/
        const libPath = resolve('./lib')
        const cssFilePath = resolve(libPath, 'index.css')
        
        // S'assurer que le dossier lib existe
        if (!existsSync(libPath)) {
          mkdirSync(libPath, { recursive: true })
        }
        
        // Contenu de remplacement
        const resetContent = `/* Automatically generated file to exclude unused components */
/* Build completed on ${new Date().toISOString()} */
/* File reset after build completion */
`
        
        // Écraser le fichier avec le contenu de base
        writeFileSync(cssFilePath, resetContent)
        
        if (showOutput) {
          console.log(`${'\x1b[32m'}✓${'\x1b[0m'} lib/index.css cleaned after build completion`)
        }
        
      } catch (error) {
        if (showOutput) {
          console.error('Error cleaning lib/index.css:', error)
        }
        if (failOnError) {
          throw error
        }
      }
    }
  }
}