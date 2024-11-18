import { SVGProps } from "react";

function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-modal-header-close
      {...props}
      style={{ cursor: "pointer", ...props.style }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.23588 5.25633C5.38712 5.10551 5.59212 5.0208 5.80586 5.0208C6.01961 5.0208 6.22461 5.10551 6.37584 5.25633L11.9896 10.8617L17.6033 5.25633C17.6772 5.17721 17.7662 5.11374 17.8652 5.06972C17.9641 5.0257 18.0709 5.00203 18.1792 5.00013C18.2875 4.99822 18.3951 5.01811 18.4955 5.05862C18.5959 5.09912 18.6872 5.15941 18.7638 5.23589C18.8404 5.31237 18.9007 5.40346 18.9413 5.50375C18.9819 5.60403 19.0018 5.71144 18.9999 5.81958C18.998 5.92772 18.9743 6.03437 18.9302 6.13316C18.8861 6.23195 18.8225 6.32086 18.7433 6.3946L13.1295 12L18.7433 17.6054C18.8225 17.6791 18.8861 17.7681 18.9302 17.8668C18.9743 17.9656 18.998 18.0723 18.9999 18.1804C19.0018 18.2886 18.9819 18.396 18.9413 18.4963C18.9007 18.5965 18.8404 18.6876 18.7638 18.7641C18.6872 18.8406 18.5959 18.9009 18.4955 18.9414C18.3951 18.9819 18.2875 19.0018 18.1792 18.9999C18.0709 18.998 17.9641 18.9743 17.8652 18.9303C17.7662 18.8863 17.6772 18.8228 17.6033 18.7437L11.9896 13.1383L6.37584 18.7437C6.22294 18.8859 6.02071 18.9634 5.81175 18.9597C5.6028 18.956 5.40343 18.8715 5.25565 18.7239C5.10787 18.5764 5.02322 18.3773 5.01954 18.1687C5.01585 17.96 5.09341 17.7581 5.23588 17.6054L10.8496 12L5.23588 6.3946C5.08484 6.24359 5 6.03889 5 5.82546C5 5.61204 5.08484 5.40734 5.23588 5.25633Z"
        fill="#6E7280"
      />
    </svg>
  );
}

export default CloseIcon;
