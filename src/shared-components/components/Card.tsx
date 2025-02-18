// src/shared-components/components/Card.tsx

import React from 'react';
import Button from "@/shared-components/ui/Button";

interface CardProps {
  data: {} | [];
  heading?: string;
  headingBtn?: any;
  btnConfig?: any;
  updateHandler?: Function;
  deleteHandler?: (_: string) => void;
  btnClassname?: string;
  showDeleteIcon?: boolean;
  loggedinRole?: string;
  noBorder?: boolean;
  config: any;
  gridCols?: number;
  columns?: number;
  cardContainer?: any;
  showDetailsBtn?: any;
  showUpdateBtn?: boolean;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  data,
  heading,
  headingBtn,
  deleteHandler,
  updateHandler,
  btnConfig = [], 
  btnClassname,
  showDeleteIcon = false,
  loggedinRole,
  config,
  columns,
  gridCols = 4,
  noBorder = false,
  cardContainer,
  showDetailsBtn = {},
  showUpdateBtn = false,
  children,
}: CardProps) => {
  const getData = () => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return [data];
    }
  };

  const cardData = getData();
  const safeBtnConfig = Array.isArray(btnConfig) ? btnConfig : [];

  return (
    <>
      <div className="flex">
        <h3 className="font-bold text-lg">{heading}</h3>
        {headingBtn && headingBtn}
      </div>
      <div className={`my-4 ${cardContainer ? cardContainer : "card-container"}`}>
        {cardData?.length > 0 ? (
          cardData.map((item: any) => (
            <div
              className={`${!noBorder && "card rounded-lg p-4"} card-content`}
              key={item.id} // Use item.id instead of item?._id
            >
              <div className={`grid ${columns ? `grid-cols-${columns}` : "grid-cols-2"} mt-4 mb-2 last-field`}>
                {/* Render fields dynamically */}
                {Object.keys(config).map((key) => {
                  const value = config[key].val;
                  const exactKey = config[key].entry;
                  const func = config[key].function;

                  const getValue = () => {
                    if (exactKey && item && !Array.isArray(item[value])) {
                      if (func) {
                        return item && item[value] ? func(item[value][exactKey]) : "-";
                      }
                      return item && item[value] ? item[value][exactKey] : "-";
                    } else {
                      if (func) {
                        return item && item[value] ? func(item[value]) : "-";
                      }
                      return item && item[value] ? item[value] : "-";
                    }
                  };
                  return (
                    !Array.isArray(config[key]) &&
                    getValue() !== "-" && (
                      <div className="flex flex-col my-2" key={key}>
                        <div className="font-semibold text-sm mb-1">{key}</div>
                        <div className="text-secondary text-sm">{getValue()}</div>
                      </div>
                    )
                  );
                })}
              </div>
              <div className={`${btnClassname} flex`}>
                {safeBtnConfig.map((value: any, index: number) => (
                  <div key={index}>
                    <Button
                      className={value.className}
                      type={value.type}
                      onClick={() => value.clickHandler(item)}
                      size={value.size}
                      variant={value.variant}
                    >
                      {value.children}
                    </Button>
                  </div>
                ))}
              </div>
              {children}
            </div>
          ))
        ) : (
          <div className="text-center">No result found</div>
        )}
      </div>

      <style>{`
        .card-content {
          display: flex;
          flex-direction: column;
        }
        .last-field {
          flex: 1;
          align-content: start;
        }
        .card {
          background-color: white;
          border: 1.5px solid ${""};
        }
        .card-container {
          display: grid;
          grid-template-columns: ${
            gridCols
              ? `repeat(${gridCols}, minmax(0, 1fr))`
              : "repeat(auto-fill, minmax(250px, 1fr))"
          };
          row-gap: 1.2rem;
          column-gap: 1.2rem;
        }
        @media screen and (max-width: 968px) {
          .card-container {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media screen and (max-width: 768px) {
          .card-container {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media screen and (max-width: 468px) {
          .card-container {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
};

export default Card;