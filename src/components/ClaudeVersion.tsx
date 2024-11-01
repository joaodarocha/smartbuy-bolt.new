import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Info, Save, Share } from 'lucide-react';
import React from 'react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const ClaudeVersion = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Costs Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Form */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <div className="space-y-4">
                  {/* Property Price */}
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1">
                      Property Price
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="€ 200,000.00"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Is this your first property?</span>
                        <Info className="w-4 h-4 text-gray-400"/>
                      </div>
                      <Switch/>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Are you up to 35 years old?</span>
                        <Info className="w-4 h-4 text-gray-400"/>
                      </div>
                      <Switch/>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div className="relative">
                    <label className="block text-sm font-medium mb-1">
                      Down Payment
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="w-1/2 p-2 border rounded"
                        placeholder="20"
                      />
                      <input
                        type="text"
                        className="w-1/2 p-2 border rounded"
                        placeholder="€ 40,000.00"
                      />
                    </div>
                  </div>

                  {/* Mortgage Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Mortgage Term
                        <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        placeholder="30 years"
                      />
                    </div>

                    {/* Euribor and Spread */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Euribor Rate
                          <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                        </label>
                        <select className="w-full p-2 border rounded">
                          <option>6 Months (2.954%)</option>
                          <option>3 Months (3.098%)</option>
                          <option>12 Months (2.622%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Bank Spread
                          <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                        </label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded"
                          placeholder="1.25%"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Total Interest Rate
                        <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded bg-gray-50"
                        placeholder="4.204%"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </label>
                    <select className="w-full p-2 border rounded">
                      <option>Continente</option>
                      <option>Madeira</option>
                      <option>Açores</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <div className="flex justify-end gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  <Save className="w-4 h-4"/>
                  Save
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  <Download className="w-4 h-4"/>
                  Export PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                  <Share className="w-4 h-4"/>
                  Share
                </button>
              </div>

              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly Costs</TabsTrigger>
                  <TabsTrigger value="details">Cost Details</TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-2">Total Upfront Costs</h4>
                          <p className="text-3xl font-bold text-blue-600">€46,827.58</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Down Payment</span>
                              <span className="font-medium">€40,000.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>IMT</span>
                              <span className="font-medium">€3,977.58</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Stamp Duty</span>
                              <span className="font-medium">€1,600.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Notary Fees</span>
                              <span className="font-medium">€1,000.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Registration Fees</span>
                              <span className="font-medium">€250.00</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium mb-2">Monthly Payment</h4>
                          <p className="text-3xl font-bold text-green-600">€674.57</p>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between">
                              <span>Mortgage Payment</span>
                              <span className="font-medium">€574.57</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Life Insurance</span>
                              <span className="font-medium">€50.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Home Insurance</span>
                              <span className="font-medium">€50.00</span>
                            </div>
                          </div>
                        </div>

                        {/* Cost Distribution Chart */}
                        <div className="aspect-square">
                          <div className="w-full h-full"/>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="monthly">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-4">Payment Schedule</h4>
                          <LineChart
                            width={500}
                            height={300}
                            data={[
                              { month: 'Jan', payment: 674.57 },
                              { month: 'Feb', payment: 674.57 },
                              { month: 'Mar', payment: 674.57 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="month"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="payment" stroke="#2563eb"/>
                          </LineChart>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-4">Bank Costs</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Dossier Commission</span>
                              <span className="font-medium">€280.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Evaluation Commission</span>
                              <span className="font-medium">€320.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Formalization Commission</span>
                              <span className="font-medium">€600.00</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-lg font-medium mb-4">Insurance Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Life Insurance Premium</span>
                              <span className="font-medium">€50.00/month</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Multi-risk Insurance</span>
                              <span className="font-medium">€50.00/month</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaudeVersion;
