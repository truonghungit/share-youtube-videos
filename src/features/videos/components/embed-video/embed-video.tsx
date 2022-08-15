export type EmbedVideoProps = {
  videoId: string;
  title: string;
};

export const EmbedVideo = ({ title = 'YouTube video player', videoId }: EmbedVideoProps) => {
  const src = `https://www.youtube.com/embed/${videoId}`;

  return (
    <iframe
      allowFullScreen
      width='100%'
      height='100%'
      src={src}
      title={title}
      frameBorder='0'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
    ></iframe>
  );
};
