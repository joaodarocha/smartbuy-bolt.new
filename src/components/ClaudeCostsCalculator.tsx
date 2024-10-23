import { Download, Info, Save, Share } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { CartesianGrid, Line as RechartsLine, LineChart, XAxis, YAxis } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ClaudeCostsCalculator = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader
          title={<Typography variant="h5" component="div">Costs Calculator</Typography>}
        />
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Form */}
            <div className="space-y-6">
              <div>
                <Typography variant="h6" component="div" className="mb-4">Property Details</Typography>
                <div className="space-y-4">
                  {/* Property Price */}
                  <div className="relative">
                    <InputLabel>Property Price</InputLabel>
                    <Tooltip title="Info about property price">
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </Tooltip>
                    <TextField
                      fullWidth
                      placeholder="€ 200,000.00"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Is this your first property?</span>
                        <Tooltip title="Info about first property">
                          <Info className="w-4 h-4 text-gray-400"/>
                        </Tooltip>
                      </div>
                      <Switch/>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Are you up to 35 years old?</span>
                        <Tooltip title="Info about age">
                          <Info className="w-4 h-4 text-gray-400"/>
                        </Tooltip>
                      </div>
                      <Switch/>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div className="relative">
                    <InputLabel>Down Payment</InputLabel>
                    <Tooltip title="Info about down payment">
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </Tooltip>
                    <div className="flex gap-2">
                      <TextField
                        fullWidth
                        placeholder="20"
                      />
                      <TextField
                        fullWidth
                        placeholder="€ 40,000.00"
                      />
                    </div>
                  </div>

                  {/* Mortgage Details */}
                  <div className="space-y-4">
                    <div>
                      <InputLabel>Mortgage Term</InputLabel>
                      <Tooltip title="Info about mortgage term">
                        <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                      </Tooltip>
                      <TextField
                        fullWidth
                        placeholder="30 years"
                      />
                    </div>

                    {/* Euribor and Spread */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <InputLabel>Euribor Rate</InputLabel>
                        <Tooltip title="Info about Euribor rate">
                          <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                        </Tooltip>
                        <FormControl fullWidth>
                          <Select>
                            <MenuItem value={2.954}>6 Months (2.954%)</MenuItem>
                            <MenuItem value={3.098}>3 Months (3.098%)</MenuItem>
                            <MenuItem value={2.622}>12 Months (2.622%)</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div>
                        <InputLabel>Bank Spread</InputLabel>
                        <Tooltip title="Info about bank spread">
                          <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                        </Tooltip>
                        <TextField
                          fullWidth
                          placeholder="1.25%"
                        />
                      </div>
                    </div>

                    <div>
                      <InputLabel>Total Interest Rate</InputLabel>
                      <Tooltip title="Info about total interest rate">
                        <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                      </Tooltip>
                      <TextField
                        fullWidth
                        placeholder="4.204%"
                        disabled
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <InputLabel>Location</InputLabel>
                    <Tooltip title="Info about location">
                      <Info className="inline-block ml-2 w-4 h-4 text-gray-400"/>
                    </Tooltip>
                    <FormControl fullWidth>
                      <Select>
                        <MenuItem value="Continente">Continente</MenuItem>
                        <MenuItem value="Madeira">Madeira</MenuItem>
                        <MenuItem value="Açores">Açores</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              <div className="flex justify-end gap-2">
                <Button variant="contained" color="primary" startIcon={<Save/>}>
                  Save
                </Button>
                <Button variant="contained" color="success" startIcon={<Download/>}>
                  Export PDF
                </Button>
                <Button variant="contained" color="primary" startIcon={<Share/>}>
                  Share
                </Button>
              </div>

              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Summary"/>
                <Tab label="Monthly Costs"/>
                <Tab label="Cost Details"/>
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <Typography variant="h6" component="div" className="mb-2">Total Upfront Costs</Typography>
                        <Typography variant="h4" component="div" className="text-blue-600">€46,827.58</Typography>
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
                        <Typography variant="h6" component="div" className="mb-2">Monthly Payment</Typography>
                        <Typography variant="h4" component="div" className="text-green-600">€674.57</Typography>
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
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <Typography variant="h6" component="div" className="mb-4">Payment Schedule</Typography>
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
                          <RechartsLine type="monotone" dataKey="payment" stroke="#2563eb"/>
                        </LineChart>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <Typography variant="h6" component="div" className="mb-4">Bank Costs</Typography>
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
                        <Typography variant="h6" component="div" className="mb-4">Insurance Details</Typography>
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
              </TabPanel>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClaudeCostsCalculator;
