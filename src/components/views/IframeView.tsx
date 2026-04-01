interface IframeViewProps {
  src: string;
  title: string;
}

export function IframeView({ src, title }: IframeViewProps) {
  return (
    <iframe
      src={src}
      title={title}
      className="w-full border-0"
      style={{ height: "calc(100vh - 7rem)" }}
    />
  );
}
