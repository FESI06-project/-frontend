import { useState } from 'react';
import apiRequest from '@/utils/apiRequest'; // apiRequest 함수 임포트

const ApiTester = () => {
  const [endpoint, setEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [method, setMethod] = useState<
    'get' | 'post' | 'put' | 'patch' | 'delete'
  >('post'); // 기본 메서드 설정

  const handleSubmit = async () => {
    try {
      // JSON 유효성 검사
      let parsedBody: object | undefined = undefined;
      if (method !== 'get' && requestBody.trim() !== '') {
        try {
          parsedBody = JSON.parse(requestBody); // JSON 파싱 시도
        } catch (jsonError) {
          setResponse('Error: Invalid JSON format in Request Body.');
          return;
        }
      }

      // apiRequest 유틸리티 함수 호출
      const data = await apiRequest({
        param: endpoint,
        method,
        requestData: parsedBody, // 파싱된 JSON 데이터 전달
      });

      setResponse(JSON.stringify(data, null, 2)); // 성공 응답 데이터 표시
    } catch (error: any) {
      setResponse(`Error: ${error.response?.data?.message || error.message}`); // 에러 메시지 표시
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">API Tester</h1>
      <div className="w-full max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as any)}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 bg-dark-200"
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="patch">PATCH</option>
            <option value="delete">DELETE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Endpoint
          </label>
          <input
            type="text"
            className="w-full bg-dark-200 border border-gray-300 rounded-md p-2 mt-1"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="Enter API endpoint (e.g., /example-endpoint)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Request Body
          </label>
          <textarea
            className="w-full border bg-dark-200 border-gray-300 rounded-md p-2 mt-1"
            rows={12}
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder="Enter JSON body"
            disabled={method === 'get' || method === 'delete'} // GET, DELETE는 body 비활성화
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md"
        >
          Send Request
        </button>
        <div>
          <label className="block text-sm font-medium text-white">
            Response
          </label>
          <pre className="w-full bg-dark-200 border border-gray-300 rounded-md p-2 mt-1 overflow-auto">
            {response || 'Response will be shown here'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ApiTester;
