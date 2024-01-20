import React, { MouseEventHandler } from "react";

type Props = {
  data: File;
  handleRemove: MouseEventHandler<HTMLButtonElement>;
};

const filePreviewItem = ({ data, handleRemove }: Props) => {
  return (
    <div className="relative pl-2 pt-2 ">
      <button
        className="z-50 absolute -top-[1px] -left-[1px] rounded-full hover:bg-light-mid bg-light-gray"
        onClick={handleRemove}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.7101 7.28983C14.6171 7.19611 14.5065 7.12171 14.3847 7.07094C14.2628 7.02017 14.1321 6.99404 14.0001 6.99404C13.8681 6.99404 13.7374 7.02017 13.6155 7.07094C13.4936 7.12171 13.383 7.19611 13.2901 7.28983L11.0001 9.58984L8.71008 7.28983C8.52178 7.10153 8.26638 6.99574 8.00008 6.99574C7.73378 6.99574 7.47838 7.10153 7.29008 7.28983C7.10178 7.47814 6.99599 7.73353 6.99599 7.99984C6.99599 8.26614 7.10178 8.52153 7.29008 8.70984L9.59008 10.9998L7.29008 13.2898C7.19635 13.3828 7.12196 13.4934 7.07119 13.6153C7.02042 13.7371 6.99428 13.8678 6.99428 13.9998C6.99428 14.1318 7.02042 14.2626 7.07119 14.3844C7.12196 14.5063 7.19635 14.6169 7.29008 14.7098C7.38304 14.8036 7.49364 14.878 7.6155 14.9287C7.73736 14.9795 7.86807 15.0056 8.00008 15.0056C8.13209 15.0056 8.2628 14.9795 8.38466 14.9287C8.50652 14.878 8.61712 14.8036 8.71008 14.7098L11.0001 12.4098L13.2901 14.7098C13.383 14.8036 13.4936 14.878 13.6155 14.9287C13.7374 14.9795 13.8681 15.0056 14.0001 15.0056C14.1321 15.0056 14.2628 14.9795 14.3847 14.9287C14.5065 14.878 14.6171 14.8036 14.7101 14.7098C14.8038 14.6169 14.8782 14.5063 14.929 14.3844C14.9797 14.2626 15.0059 14.1318 15.0059 13.9998C15.0059 13.8678 14.9797 13.7371 14.929 13.6153C14.8782 13.4934 14.8038 13.3828 14.7101 13.2898L12.4101 10.9998L14.7101 8.70984C14.8038 8.61687 14.8782 8.50627 14.929 8.38441C14.9797 8.26255 15.0059 8.13185 15.0059 7.99984C15.0059 7.86782 14.9797 7.73712 14.929 7.61526C14.8782 7.4934 14.8038 7.3828 14.7101 7.28983ZM18.0701 3.92984C17.1476 2.97473 16.0442 2.21291 14.8241 1.68882C13.6041 1.16473 12.2919 0.888869 10.9641 0.877331C9.6363 0.865793 8.3195 1.11881 7.09054 1.62162C5.86158 2.12443 4.74506 2.86696 3.80613 3.80589C2.8672 4.74481 2.12467 5.86133 1.62186 7.09029C1.11905 8.31926 0.866037 9.63605 0.877575 10.9638C0.889113 12.2916 1.16498 13.6038 1.68907 14.8239C2.21316 16.0439 2.97498 17.1474 3.93008 18.0698C4.85255 19.0249 5.95599 19.7868 7.17603 20.3109C8.39607 20.8349 9.70827 21.1108 11.0361 21.1223C12.3639 21.1339 13.6807 20.8809 14.9096 20.3781C16.1386 19.8752 17.2551 19.1327 18.194 18.1938C19.133 17.2549 19.8755 16.1383 20.3783 14.9094C20.8811 13.6804 21.1341 12.3636 21.1226 11.0358C21.111 9.70803 20.8352 8.39583 20.3111 7.17579C19.787 5.95575 19.0252 4.8523 18.0701 3.92984ZM16.6601 16.6598C15.3521 17.9692 13.6306 18.7847 11.7889 18.9671C9.94713 19.1496 8.09908 18.6879 6.5596 17.6606C5.02012 16.6333 3.88444 15.104 3.34605 13.3333C2.80767 11.5626 2.89988 9.65998 3.60699 7.94962C4.3141 6.23926 5.59235 4.82698 7.22397 3.9534C8.85559 3.07981 10.7396 2.79897 12.5551 3.15871C14.3706 3.51845 16.0051 4.49653 17.1803 5.9263C18.3555 7.35607 18.9986 9.14907 19.0001 10.9998C19.0036 12.0511 18.7987 13.0927 18.397 14.0642C17.9953 15.0358 17.405 15.918 16.6601 16.6598Z"
            fill="#435334"
          />
        </svg>
      </button>
      {data.type.startsWith("image/") ? (
        <img
          src={URL.createObjectURL(data)}
          alt="file"
          className="object-cover rounded-xl h-20 w-20 border"
        />
      ) : (
        <div
          className="bg-light-mid text-sm font-semibold break-words overflow-auto w-20 h-20 rounded-xl p-2"
          style={{ scrollbarGutter: "stable" }}
        >
          {data.name}
        </div>
      )}
    </div>
  );
};

export default filePreviewItem;