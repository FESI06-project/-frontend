import Alert from "@/components/Alert";
import { useState } from "react";

export default function AlertTestPage() {
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [showSelectAlert, setShowSelectAlert] = useState(false);
    
    const handleConfirm = () => {
      setShowConfirmAlert(false);
      setShowSelectAlert(false);
      console.log('Confirmed!');
    };
    
    const handleCancel = () => {
      setShowSelectAlert(false);
      console.log('Cancelled!');
    };
  
    return (
      <div className="min-h-screen p-8">
        <div className="mx-auto max-w-md space-y-4 rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-6 text-2xl font-bold">Alert 컴포넌트 테스트</h1>
          
          {/* Confirm 타입 Alert 테스트 */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Confirm Alert</h2>
            <button
              onClick={() => setShowConfirmAlert(true)}
              className="w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Confirm Alert 열기
            </button>
          </div>
  
          {/* Select 타입 Alert 테스트 */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Select Alert</h2>
            <button
              onClick={() => setShowSelectAlert(true)}
              className="w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600"
            >
              Select Alert 열기
            </button>
          </div>
  
          {/* Alert 컴포넌트들 */}
          <Alert
            isOpen={showConfirmAlert}
            type="confirm"
            message="확인 Alert 입니다. 확인을 눌러주세요."
            onConfirm={handleConfirm}
          />
  
          <Alert
            isOpen={showSelectAlert}
            type="select"
            message="선택 Alert 입니다 선택해주세요."
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    );
  }