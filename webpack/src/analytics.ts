import * as $ from 'jquery'

function createAnalytics(): object {
    let counter = 0
    let isDestroyed: boolean = false

    const listener = (): number => counter++

    $(document).on('click',listener)

    return {
        destroy() {
            $(document).off('click', listener)
            isDestroyed = true
        },

        getClicks() {
            return isDestroyed ? 'Analitycs is destroyed' : counter
        }
    }
}

window['analytics'] = createAnalytics()