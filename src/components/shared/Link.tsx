import { ButtonOrLink, ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {}

export function Link(props: Props) {
  return (
    <ButtonOrLink
      className="font-medium underline hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-500"
      {...props}
    />
  );
}
