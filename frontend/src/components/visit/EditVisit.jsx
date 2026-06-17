import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "react-bootstrap-icons";
import { getVisit, updateVisit } from "../../services/visitService";
import VisitForm from "./VisitForm";

function EditVisit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [initialValues, setInitialValues] = useState({
        doctorId: "",
        patientId: "",

        visitDate: "",

        complaints: "",
        diagnosis: "",
        advice: "",

        bp: "",
        pulse: "",
        saturation: "",
        temperature: "",
        respirationRate: "",
        weight: "",

        fastingSugar: "",
        ppSugar: "",
        randomSugar: "",
        ureaCreatinine: "",
        hb: "",
        ecg: "",

        pastHistory: "",
        currentMedication: "",
        additionalNotes: "",

        edema: "",
        pallor: "",
        jaundice: "",
        cvs: "",
        rs: "",
        pa: "",
        cns: "",

        followupDate: "",
        status: ""
    });

    useEffect(() => {
        fetchVisit();
    }, []);

    const fetchVisit = async () => {
        try {
            const visit = await getVisit(id);

            setInitialValues({
                doctorId: visit.doctor?.id || "",
                patientId: visit.patient?.id || "",

                visitDate: visit.visitDate || "",

                complaints: visit.complaints || "",
                diagnosis: visit.diagnosis || "",
                advice: visit.advice || "",

                bp: visit.bp || "",
                pulse: visit.pulse || "",
                saturation: visit.saturation || "",
                temperature: visit.temperature || "",
                respirationRate: visit.respirationRate || "",
                weight: visit.weight || "",

                fastingSugar: visit.fastingSugar || "",
                ppSugar: visit.ppSugar || "",
                randomSugar: visit.randomSugar || "",
                ureaCreatinine: visit.ureaCreatinine || "",
                hb: visit.hb || "",
                ecg: visit.ecg || "",

                pastHistory: visit.pastHistory || "",
                currentMedication: visit.currentMedication || "",
                additionalNotes: visit.additionalNotes || "",

                edema: visit.edema || "",
                pallor: visit.pallor || "",
                jaundice: visit.jaundice || "",

                cvs: visit.cvs || "",
                rs: visit.rs || "",
                pa: visit.pa || "",
                cns: visit.cns || "",

                followupDate: visit.followupDate || "",
                status: visit.status || ""
            });

        } catch (error) {
            toast.error("Failed to load visit");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await updateVisit(id, values);

            toast.success("Visit updated successfully");
            navigate("/admin/visits");

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update visit"
            );

            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-2 fw-semibold">
                    Edit Visit
                </span>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/admin/visits")}
                >
                    <ArrowLeft className="me-2" />
                    Go Back
                </button>
            </div>

            <VisitForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
                isEdit={true}
            />
        </>
    );
}

export default EditVisit;