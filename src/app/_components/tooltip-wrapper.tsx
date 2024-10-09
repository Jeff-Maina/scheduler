import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
  type TooltipContentProps = React.ComponentProps<typeof TooltipContent>;
  
  type TooltipPropsType = {
    children: JSX.Element;
    label: string;
  } & TooltipContentProps;
  
  const TooltipWrapper = ({ children, label, ...props }: TooltipPropsType) => {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent {...props}>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  export default TooltipWrapper;