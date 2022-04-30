import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import {CartContext} from "../../context/CartContext";
import cartReducer from "../../reducer/cartReducer";
import {CartActionReducer} from "../../shared/shareddtypes";

const steps = ["List products", "Select shipping address", "Order summary"];

type Props = {
    step: number
    isValidAddress?: boolean
    isValidName?: boolean
    handleSubmit?: () => void
}

export default function HorizontalLinearStepper(props: Props) {
    const {step, isValidAddress, isValidName, handleSubmit} = props
    const [activeStep, setActiveStep] = React.useState(step);
    const {cartItems} = useContext(CartContext)
    const history = useHistory()

    const handleNext = () => {
        if(activeStep === 0)
            history.push("/checkout/shippingData")
        if(activeStep === 1 && isValidAddress && isValidName) {
            history.push("/checkout/summary")
        }
        if(activeStep === 2 && handleSubmit) {
            handleSubmit()
            history.push("/checkout/success")
        }
    };

    const handleBack = () => {
        if(activeStep === 0)
            history.push("/")
        if(activeStep === 1)
            history.push("/checkout/displayProducts")
        if(activeStep === 2)
            history.push("/checkout/shippingData")
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            {activeStep === 0 ? "Continue shopping" : "BACK"}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Confirm order' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}