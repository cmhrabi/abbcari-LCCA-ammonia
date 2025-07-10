import React, { useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import Text from "../design/Text/Text";
import Card from "../design/Card/Card";
import { ChartBarSquareIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { AnalysisName, getSavedAnalyses, getAnalysisById } from "../api";
import { useAuth0, User } from "@auth0/auth0-react";
import { addToast, Spinner } from "@heroui/react";
import {
  resetState as resetNameState,
  setNameState,
} from "../Slices/nameSlice";
import {
  resetState as resetGeneralState,
  setGeneralState,
} from "../Slices/generalSlice";
import {
  resetState as resetElectrifiedState,
  setElectrifiedState,
} from "../Slices/electrifiedSlice";
import {
  resetState as resetConventionalState,
  setConventionalState,
} from "../Slices/conventionalSlice";
import { useAppDispatch } from "../hooks";

const Saved = () => {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = React.useState([] as AnalysisName[]);
  const [loading, setLoading] = React.useState(true);
  const { user } = useAuth0();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetConventionalState());
    dispatch(resetElectrifiedState());
    dispatch(resetGeneralState());
    dispatch(resetNameState());
  }, []);

  const handleAnalysisClick = async (analysis: AnalysisName) => {
    if (!user || !user.sub) {
      addToast({
        title: "Not logged in",
        description: "Please log in to access saved analyses.",
        severity: "warning",
      });
      return;
    }
    getAnalysisById(user.sub, analysis.id)
      .then((response) => {
        if (response.error || !response.response) {
          addToast({
            title: "Error fetching analysis",
            description: response.error,
            severity: "danger",
          });
        } else {
          dispatch(setNameState(response.response.nameSlice));
          dispatch(setElectrifiedState(response.response.electrifiedSlice));
          dispatch(setConventionalState(response.response.conventionalSlice));
          dispatch(setGeneralState(response.response.generalSlice));
          navigate("/analysis/start");
        }
      })
      .catch((error) => {
        addToast({
          title: "Error fetching analysis",
          description: error,
          severity: "danger",
        });
      });
  };

  useEffect(() => {
    const fetchAnalyses = async (user: User) => {
      getSavedAnalyses(user.sub?.replace(/^auth0\|/, "") as string)
        .then((response) => {
          if (response.error) {
            addToast({
              title: "Error fetching analyses",
              description: response.error,
              severity: "danger",
            });
          } else {
            setAnalyses(response.analyses);
            setLoading(false);
          }
        })
        .catch((error) => {
          addToast({
            title: "Error fetching analyses",
            description: error,
            severity: "danger",
          });
        });
    };

    if (user) {
      fetchAnalyses(user);
    }
  }, [user]);

  return (
    <>
      <NavBar title="COMPASS" />
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Spinner size="lg" color="primary" />
        </div>
      )}
      {!loading && analyses.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Text textSize="sub2" color="secondary">
            No saved analyses found.
          </Text>
        </div>
      )}
      {!loading && (
        <div className="py-16 max-w-6xl m-auto">
          <div className="pb-7">
            <Text color="secondary" textSize="h2">
              Your LCCA Analyses
            </Text>
          </div>
          <div className=" grid grid-cols-3 gap-x-24 gap-y-12">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                onClick={() => {
                  handleAnalysisClick(analysis);
                }}
              >
                <Card
                  variant="primary"
                  icon={<ChartBarSquareIcon className="size-11 text-primary" />}
                >
                  {analysis.name}
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Saved;
