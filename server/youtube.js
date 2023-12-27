const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export async function searchYouTube(query) {
    console.log(query)
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&q=${query}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    let vids = []

    for(let i = 0; i < data.items.length; i++) {
        vids.push(data.items[i].id.videoId)
    }

    console.log(vids)

    return vids;
}

