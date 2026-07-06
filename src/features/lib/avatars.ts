const avatarModules = import.meta.glob("../../assets/images/avatars/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export function getAvatarUrl(filename: string): string {
  const match = Object.entries(avatarModules).find(([path]) =>
    path.endsWith(`/${filename}`)
  );

  return match?.[1] ?? "";
}
