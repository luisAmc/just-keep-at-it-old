import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from 'react';

type ButtonOrLinkType = ComponentProps<'button'> & ComponentProps<'a'>;

export interface ButtonOrLinkProps extends ButtonOrLinkType {
  preserveRedirect?: boolean;
}

export function ButtonOrLink({
  href,
  preserveRedirect,
  ...props
}: ButtonOrLinkProps) {
  const router = useRouter();
  const isLink = typeof href !== 'undefined';
  const ButtonOrLink = isLink ? 'a' : 'button';

  let content = <ButtonOrLink {...props} />;

  if (isLink) {
    const finalHref =
      preserveRedirect && router.query.redirect
        ? `${href!}?redirect=${encodeURIComponent(
            router.query.redirect as string
          )}`
        : href!;

    return <Link href={finalHref}>{content}</Link>;
  }

  return content;
}
