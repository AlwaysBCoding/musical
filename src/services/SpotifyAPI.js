import Q from 'q'

var ACCESS_TOKEN = "BQBKsMDJDrHZi8Bh9K5tCHDCGM6gRCHidzRaKsufwEdLV_icIFOXyc_NdUd5Lh5C5Cg8_Uq59CGKQ7Bpkds"

class SpotifyAPI {

  constructor({endpoint, clientID, clientSecret}) {
    this.endpoint = endpoint
    this.clientID = clientID
    this.clientSecret = clientSecret
  }

  getAccessToken() {
    var base64Slug = btoa(`${this.clientID}:${this.clientSecret}`)
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Basic ${base64Slug}`)

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`https://accounts.spotify.com/api/token`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getTrack({trackID}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${ACCESS_TOKEN}`)

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/tracks/${trackID}`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getAudioAnalysisForTrack({trackID}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${ACCESS_TOKEN}`)

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/audio-analysis/${trackID}`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

  getAudioFeaturesForTrack({trackID}) {
    var deferred = Q.defer()
    var headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${ACCESS_TOKEN}`)

    var fetchConfig = {
      method: "GET",
      headers: headers
    }

    fetch(`${this.endpoint}/audio-features/${trackID}`, fetchConfig)
    .then((response) => {
      deferred.resolve(response.json())
    })
    .catch((error) => {
      deferred.reject(error)
    })

    return deferred.promise
  }

}

export default new SpotifyAPI({
  endpoint: "https://api.spotify.com/v1",
  clientID: "da7f53901ff443b9a523b5c9f2edded0",
  clientSecret: "2472ecc995754f78ad7e71c17e64697f"
})

// TrackID: 3IEb6eoUOVEPp4wvGcBbx9
// Authorization: Bearer "OAUTHTOKEN..."
// Base64Encoded: ZGE3ZjUzOTAxZmY0NDNiOWE1MjNiNWM5ZjJlZGRlZDA6MjQ3MmVjYzk5NTc1NGY3OGFkN2U3MWMxN2U2NDY5N2Y=
// AccessToken: BQBKsMDJDrHZi8Bh9K5tCHDCGM6gRCHidzRaKsufwEdLV_icIFOXyc_NdUd5Lh5C5Cg8_Uq59CGKQ7Bpkds
// AccessToken needs to be reclaimed every hour
