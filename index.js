const fs = require('fs')
const path = require('path')

module.exports = {
    options: {
        alias: 'stripeExamples'
    },
    bundle: {
        directory: 'modules',
        modules: getBundleModuleNames()
    },
}

function getBundleModuleNames() {
    return fs.readdirSync(path.resolve(__dirname, 'modules')).reduce((result, dir) => {
        if (dir.includes('stripe') && !(/(^|\/)\.[^/.]/g).test(dir)) {
            const subdirectories = fs.readdirSync(path.resolve(__dirname, `modules/${dir}`))
            subdirectories.forEach((subdir) => {
                if (!(/(^|\/)\.[^/.]/g).test(subdir)) {
                    result.push(`${dir}/${subdir}`)
                }
            })
        }
        return result
    }, [])
}
