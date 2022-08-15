import { ID_CHARACTER_COUNT, YOUTUBE_DATA_API_KEY, YOUTUBE_DATA_API_URL, YOUTUBE_VIDEO_URL_REGEX } from '../constant';

class YoutubeDataService {
  getVideoData(videoId: string) {
    const url = `${YOUTUBE_DATA_API_URL}?part=snippet&id=${videoId}&key=${YOUTUBE_DATA_API_KEY}&fields=items(id,snippet/title,snippet)`;

    return fetch(url);
  }

  extractVideoID(url: string): string | null {
    const match = url.match(YOUTUBE_VIDEO_URL_REGEX);
    if (match && match[1] && match[1].length === ID_CHARACTER_COUNT) {
      return match[1];
    } else {
      return null;
    }
  }
}

export default new YoutubeDataService();
