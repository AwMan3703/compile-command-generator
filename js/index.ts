const commandOutputParagraph = document.querySelector('p#command-output') as HTMLParagraphElement
const commandBuilderOptionsForm = document.querySelector('form#command-builder-options') as HTMLFormElement

type commandOptions = {
    compiler: string // Will always be gcc
    sourceCodeFile: string
    binaryOutputFile: string
    runBinaryWhenCompiled: boolean
    clearScreenBeforeRunning: boolean
    deleteBinaryAfterRunning: boolean
}

// EXAMPLE: clear && gcc my/source/code.c -o my/binary && ./my/binary && rm ./my/binary
function generateCommand(options: commandOptions) {
    let command: string

    command += `${}`

    return command
}

function updateCommand() {
    const options: commandOptions = {
        compiler: 'gcc',
        sourceCodeFile: './mycode.c',
        binaryOutputFile: './mybin',
        runBinaryWhenCompiled: true,
        clearScreenBeforeRunning: true,
        deleteBinaryAfterRunning: true
    }
    commandOutputParagraph.innerText = generateCommand(options)
}


commandBuilderOptionsForm.addEventListener('change', updateCommand)