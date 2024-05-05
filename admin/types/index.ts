export interface TechIconProps {
      name: string;
      description: string;
      iconUrl: string;
      documentationUrl: string;
};

export interface WrapperFormProps {
      titleForm: string;
      descriptionForm: string;
      children: React.ReactNode;
};

export interface AnimBottomToTopProps {
      children: React.ReactNode;
      delay?: number;
};

export interface AsideProps {
      isAsideVisible: boolean
      setIsAsideVisible: (isAsideVisible: boolean) => void;
      isMobile?: boolean;
};

export interface NavigationProps {
      icon: React.ElementType;
      title: string;
      pageUrl: string;
};