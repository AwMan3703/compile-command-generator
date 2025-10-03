// CONSTANTS
const SOURCE_CODE_EXTENSION = '.c'
const COMPILER_INFO = {
    output_path_parameter_name: '-o',
    default_output_filename: 'a.out'
}

const commandOutputParagraph = document.querySelector('p#command-output') as HTMLParagraphElement
const copyCommandOutputButton = document.querySelector('button#copy-command-output') as HTMLButtonElement

const commandBuilderOptionsForm = document.querySelector('form#command-builder-options') as HTMLFormElement
const commandBuilderInput_useCompiler = document.querySelector('form#command-builder-options input#use-compiler') as HTMLInputElement
const commandBuilderInput_compilerSelector = document.querySelector('form#command-builder-options select#compiler-selector') as HTMLSelectElement
const commandBuilderInput_useSourcePath = document.querySelector('form#command-builder-options input#use-source-path') as HTMLInputElement
const commandBuilderInput_sourcePath = document.querySelector('form#command-builder-options input#source-path') as HTMLInputElement
const commandBuilderInput_outputPath = document.querySelector('form#command-builder-options input#output-path') as HTMLInputElement
const commandBuilderInput_runBinaryAfterCompiling = document.querySelector('form#command-builder-options input#run-binary-after-compiling') as HTMLInputElement
const commandBuilderInput_clearScreenBeforeRunning = document.querySelector('form#command-builder-options input#clear-screen-before-running') as HTMLInputElement
const commandBuilderInput_deleteBinaryAfterRunning = document.querySelector('form#command-builder-options input#delete-binary-after-running') as HTMLInputElement

type commandOptions = {
    compilerName: string
    sourceCodePath: string
    binaryOutputPath: string
    runBinaryWhenCompiled: boolean
    clearScreenBeforeRunning: boolean
    deleteBinaryAfterRunning: boolean
}


// FUNCTIONS

// EXAMPLE: clear && gcc my/source/code.c -o my/binary && ./my/binary && rm ./my/binary
function generateCommand(options: commandOptions) {
    let command: string[] = []

    // Compiler command
    command.push(`${options.compilerName}`)
    // if no source path is specified, return just this
    if (!options.sourceCodePath) return command.join(' ')
    // Compiler options
    if (options.sourceCodePath) command.push(`${options.sourceCodePath}`)
    if (options.binaryOutputPath) command.push(`${COMPILER_INFO.output_path_parameter_name} ${options.binaryOutputPath}`)
    command.push('&&')
    // Run after compiling
    if (options.runBinaryWhenCompiled) {
        // Clear
        if (options.clearScreenBeforeRunning) {
            command.push(`clear`)
            command.push('&&')
        }
        // Run
        command.push(`${options.binaryOutputPath ? options.binaryOutputPath : COMPILER_INFO.default_output_filename}`)
        command.push('&&')
        // Delete
        if (options.deleteBinaryAfterRunning) {
            command.push(`rm ${options.binaryOutputPath ? options.binaryOutputPath : COMPILER_INFO.default_output_filename}`)
            command.push('&&')
        }
    }

    // Lazy aah solution cz ion wanna keep track of what the last command is
    if (command[command.length-1] === '&&') command.pop()

    return command.join(' ')
}

function getCommandBuilderFormData() {
    const options: commandOptions = {}
    options.compilerName = commandBuilderInput_useCompiler ? commandBuilderInput_compilerSelector.selectedOptions[0].value : ''
    options.sourceCodePath = commandBuilderInput_useSourcePath.checked ? commandBuilderInput_sourcePath.value : ''
    options.binaryOutputPath = commandBuilderInput_outputPath.value
    options.runBinaryWhenCompiled = commandBuilderInput_runBinaryAfterCompiling.checked
    options.clearScreenBeforeRunning = commandBuilderInput_clearScreenBeforeRunning.checked
    options.deleteBinaryAfterRunning = commandBuilderInput_deleteBinaryAfterRunning.checked
    return options
}

function updateCommandOutput() {
    const options = getCommandBuilderFormData()
    commandOutputParagraph.innerText = generateCommand(options)
}



// SCRIPT

copyCommandOutputButton.addEventListener('click', _ => {
    navigator.clipboard.writeText(commandOutputParagraph.innerText)
        .then(text => {
            const originalLabel = copyCommandOutputButton.innerText
            copyCommandOutputButton.innerText = commandOutputParagraph.innerText.length > 0 ? 'Copiato!' : 'Nulla da copiare!'
            setTimeout(_ => copyCommandOutputButton.innerText = originalLabel, 2000)
        })
})

commandBuilderInput_sourcePath.addEventListener('input', _ => {
    const e = commandBuilderInput_sourcePath
    if (e.value.endsWith(SOURCE_CODE_EXTENSION)) return
    e.value += SOURCE_CODE_EXTENSION
    e.selectionStart = e.selectionEnd = e.value.length - 2
})
commandBuilderInput_outputPath.addEventListener('input', _ => {
    const e = commandBuilderInput_outputPath
    if (e.value && e.value !== '') e.value = (!e.value.startsWith('./') ? './' : '') + (e.value !== '.' ? e.value : '')
    else e.value = COMPILER_INFO.default_output_filename
})
commandBuilderOptionsForm.addEventListener('change', updateCommandOutput)
commandBuilderOptionsForm.addEventListener('submit', e => {
    e.preventDefault()
    updateCommandOutput()
})

updateCommandOutput()
setInterval(_ => commandOutputParagraph.classList.toggle('cursor'), 500)