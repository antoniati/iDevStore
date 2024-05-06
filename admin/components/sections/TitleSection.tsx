import { TitleSectionProps } from "@/types";

export const TitleSection = ({ icon: IconComponent, title }: TitleSectionProps) => {
      const iconSize = 16;

      return (
            <h1 className="w-full p-2 text-tremor-title flex items-center font-medium space-x-2 bg-blue-50 rounded-tremor-default">
                  {IconComponent && <IconComponent size={iconSize} />}
                  <span>{title}</span>
            </h1>
      );
};