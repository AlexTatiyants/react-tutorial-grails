package reactTutorial

import asset.pipeline.AbstractAssetFile
import java.util.regex.Pattern

class JsxAssetFile extends AbstractAssetFile {
    static final contentType = ['application/javascript','application/x-javascript','text/javascript']
    static extensions = ['jsx', 'js.jsx']
    static final String compiledExtension = 'js'
    static processors = [JsxProcessor]
    Pattern directivePattern = ~/(?m)#=(.*)/
}
