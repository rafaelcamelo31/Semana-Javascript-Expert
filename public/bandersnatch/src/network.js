class Network {
    constructor({ host }) {
        this.host = host
    }

    parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag }) {
        return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host)
    }

    async fetchFile(url) {
        const response = await fetch(url)
        return response.arrayBuffer()
    }

    async getProperResolution(url) {
        const startMs = Date.now()
        const response = await fetch(url)
        await response.arrayBuffer()
        const endMs = Date.now()
        const durationInMs = (endMs - startMs)
        console.log('durationInMs', durationInMs)

        // Ao invés de calcular o throughPut vamos calcular pelo tempo
        const resolutions = [
            // Pior caso possível, 20 segundos
            { start: 3000, end: 20000, resoltuin: 144 },
            // Até 3 segundos
            { start: 901, end: 3000, resoltuin: 360 },
            // Menos 1 segundo
            { start: 0, end: 900, resoltuin: 720 },
        ]

        const item = resolutions.find(item => {
            return item.start <= durationInMs && item.end >= durationInMs
        })

        const LOWEST_RESOLUTION = 144
        // Se for mais de 30s
        if (!item) return LOWEST_RESOLUTION

        return item.resoltuin
    }
}