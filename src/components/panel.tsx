import {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';
import { styled } from 'twin.macro';
import { Transition } from '@headlessui/react';
import { useClickAway } from 'react-use';

import AspectRatio from './aspectRatio';
import { Dots, User, UserRemove } from './svgs';

type StyledProps = {
  $bgColor: string;
};

type Props = HTMLAttributes<HTMLDivElement> &
  StyledProps & {
    displayName: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };

const StyledAspectRatio = styled(AspectRatio)<StyledProps>`
  background-color: ${({ $bgColor }) => $bgColor};
`;

const Panel: FunctionComponent<Props> = ({
  $bgColor,
  displayName,
  onClick,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const [isHover, setHover] = useState<boolean>(false);

  const handleMouseEnter = () => setHover(true);

  const handleMouseLeave = () => {
    setOpen(false);
    setHover(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickAway(dropdownRef, () => {
    setOpen(false);
  });

  return (
    <StyledAspectRatio
      tw="rounded relative overflow-hidden"
      $bgColor={$bgColor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      {isHover && (
        <div ref={dropdownRef}>
          <button
            tw="absolute top-0 right-0 bg-gray-800 opacity-40 text-white py-1 mr-2 mt-2 rounded hover:(bg-gray-900 opacity-50)"
            onClick={() => setOpen(prev => !prev)}
            onDoubleClick={e => e.stopPropagation()}
          >
            <Dots tw="h-6 w-6" />
          </button>
          <Transition
            tw="relative"
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div tw="origin-top-right absolute right-0 mt-10 mr-2 z-20 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                tw="px-1 py-1 flex justify-end"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  tw="block flex px-2 py-2 text-sm text-right right-0 text-gray-700 hover:(bg-gray-100 text-gray-900)"
                  role="menuitem"
                  onClick={args => {
                    onClick(args);
                    setOpen(false);
                  }}
                >
                  <UserRemove tw="text-purple-300 h-5 w-5 mr-2" />
                  Remove
                </button>
              </div>
            </div>
          </Transition>
        </div>
      )}
      <div tw="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto bg-gray-900 rounded-full">
        <User tw="h-10 w-10" />
      </div>
      <div tw="absolute bottom-0 left-0 px-1 py-0.5 ml-2 mb-2 bg-gray-800 opacity-40 text-white rounded">
        {displayName}
      </div>
    </StyledAspectRatio>
  );
};

export default Panel;
