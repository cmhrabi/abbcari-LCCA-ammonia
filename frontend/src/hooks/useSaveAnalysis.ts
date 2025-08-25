import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { cleanDataForSave, saveAnalysis } from "../api";
import { addToast } from "@heroui/react";
import { setAnalysisId } from "../Slices/nameSlice";

export const useSaveAnalysis = () => {
  const [saveLoading, setSaveLoading] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useAppDispatch();
  
  const electrifiedSlice = useAppSelector((state) => state.electrified);
  const conventionalSlice = useAppSelector((state) => state.conventional);
  const nameSlice = useAppSelector((state) => state.name);
  const generalSlice = useAppSelector((state) => state.general);

  const handleSave = async (analysis_id?: string) => {
    if (!isAuthenticated || !user?.sub) {
      addToast({
        title: "Authentication required",
        description: "Please log in to save your analysis",
        classNames: {
          base: "bg-warning-bg rounded-3px border-warning",
          description: "text-grey-dark",
          icon: "text-warning",
        },
        severity: "warning",
      });
      return false;
    }

    setSaveLoading(true);
    
    const data = cleanDataForSave(
      electrifiedSlice,
      conventionalSlice,
      nameSlice,
      generalSlice,
    );
    
    if (data.error !== "") {
      addToast({
        title: "Error in analysis",
        description: data.error,
        classNames: {
          base: "bg-danger-bg rounded-3px border-danger",
          description: "text-grey-dark",
          icon: "text-danger",
        },
        severity: "danger",
      });
      setSaveLoading(false);
      return false;
    }

    if (data.payload) {
      // Use existing analysis ID from state if available, or the provided one
      const currentAnalysisId = analysis_id || nameSlice.value.analysisId || undefined;
      const result = await saveAnalysis(data.payload, user.sub, currentAnalysisId);
      
      if (result.saved) {
        // Update the analysis ID in state if returned from backend
        if (result.response?.analysis_id) {
          dispatch(setAnalysisId(result.response.analysis_id));
        }
        
        addToast({
          title: "Analysis saved successfully",
          description: "Your analysis has been saved and can be accessed later",
          classNames: {
            base: "bg-success-bg rounded-3px border-success",
            description: "text-grey-dark",
            icon: "text-success",
          },
          severity: "success",
        });
        setSaveLoading(false);
        return true;
      } else {
        addToast({
          title: "Error saving analysis",
          description: result.error,
          classNames: {
            base: "bg-danger-bg rounded-3px border-danger",
            description: "text-grey-dark",
            icon: "text-danger",
          },
          severity: "danger",
        });
      }
    }
    setSaveLoading(false);
    return false;
  };

  const onSaveClick = () => {
    handleSave();
  };

  return {
    handleSave,
    onSaveClick,
    saveLoading,
    isAuthenticated
  };
};
