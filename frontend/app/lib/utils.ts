
export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export function formatFileSize(bytes?: number | null): string {
  if (bytes == null || isNaN(bytes)) return "—";

  if (bytes === 0) return "0 B";

  const k = 1024;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
}

export function getExtension(filename: string) {
  return filename.substring(filename.lastIndexOf("."));
}