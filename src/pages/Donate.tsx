import React from 'react';
import { DONATION_DATA } from '../../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Donate: React.FC = () => {
  return (
    <div className="p-6 pb-20">
      <h1 className="text-3xl font-serif font-bold text-wccw-purple mb-8 tracking-wide text-center">후원하기</h1>
      
      <div className="space-y-8">
        <section className="bg-purple-50 rounded-2xl p-8 text-center">
          <p className="text-xl text-wccw-purple font-serif mb-4">
            여러분의 후원은 정의와 평화의 여정에 큰 힘이 됩니다.
          </p>
          <p className="text-gray-700 mb-6">
            워싱턴 정신대대책위원회는 피해자 할머니들의 명예 회복과 올바른 역사 교육을 위해 활동합니다.
          </p>
          <a 
            href="https://wccw.org/donate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-wccw-purple text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-700 transition-all"
          >
            지금 후원하기
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-wccw-purple mb-6 text-center">2024 후원 통계</h2>
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={DONATION_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#6B21A8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="text-center text-gray-600 text-sm">
          <p>모든 후원은 세금 공제 대상입니다.</p>
          <p className="mt-2">문의: donate@wccw.org</p>
        </section>
      </div>
    </div>
  );
};

export default Donate;