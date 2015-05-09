package reactTutorial

import asset.pipeline.AssetCompiler
import asset.pipeline.AssetFile
import asset.pipeline.AbstractProcessor

class JsxProcessor extends AbstractProcessor {
    final static DUMB_JSX_COMPILER_WARNING_TO_IGNORE = 'built Module("<stdin>")'

    JsxProcessor(AssetCompiler precompiler) {
        super(precompiler)
    }

    String process(String input, AssetFile assetFile) {
        def nodeProcess
        StringBuilder output = new StringBuilder()
        StringBuilder err = new StringBuilder()

        try {
            String command = "jsx --harmony "
            nodeProcess = command.execute()

            nodeProcess.getOutputStream().write(input.bytes)
            nodeProcess.getOutputStream().flush()
            nodeProcess.getOutputStream().close()
            nodeProcess.waitForProcessOutput(output, err)

            // jsx compiler throws a warning which causes the process to fail
            // the code below ignores the warning
            if (err && err.indexOf(DUMB_JSX_COMPILER_WARNING_TO_IGNORE) == -1) {
                println err.indexOf(DUMB_JSX_COMPILER_WARNING_TO_IGNORE)
                throw new Exception(err.toString())
            }

            return output.toString()

        } catch (Exception e) {
            throw new Exception("""
                jsx cannot be compiled
                $e
                """)
        }
    }

}
